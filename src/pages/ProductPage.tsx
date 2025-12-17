import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "@contexts/AuthContext";
import CustomModal from "@components/CustomModal";
import Loader from "@components/ui/Loader";
import { TicketIcon, CheckIcon, ArrowUDownLeftIcon, BookmarkSimpleIcon } from "@phosphor-icons/react";

import getProductDetail from "@services/marketplace/getProductDetail";
import getProductsRelated from "@services/marketplace/getProductsRelated";
import postSavedProductAdd from "@services/marketplace/postSavedProductsAdd";
import deleteSavedProduct from "@services/marketplace/deleteSavedProduct";
import postCouponGenerate from "@services/marketplace/postCouponGenerate";

interface ProductComplete extends Product {
  price_cents: number;
  quantity: number;
  purchase_contact: string;
  is_sustainable: boolean;
  category: string;
  created_at: string;
  is_saved_by_consumer: boolean | null;
}

export default function ProductPage() {
  const { id } = useParams();
  const product_id = Number(id)
  const navigate = useNavigate();
  const { isVisitor, userData } = useContext(AuthContext)!;

  const [dataProduct, setDataProduct] = useState<ProductComplete | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [couponConfirmation, setCouponConfirmation] = useState(false);
  const [isLoadingGenerateCoupon, setIsLoadingGenerateCoupon] = useState(false);

  function handleMessageError(messageError: string) {
    console.error(messageError);
  }

  async function tryProductDetails() {
    setIsLoading(true)

    try {
      const response = await getProductDetail(product_id);

      setDataProduct(response);
    } catch (error: any) {
      handleMessageError("Erro ao carregar detalhes");
    }

    setIsLoading(false)
  }

  async function tryRelatedProducts() {
    try {
      const response = await getProductsRelated(product_id);
      setRelatedProducts(response);
    } catch {
      handleMessageError("Erro ao carregar relacionados");
    }
  }

  useEffect(() => {
    if (!id) return;

    tryProductDetails();
    tryRelatedProducts();
  }, [id]);

  useEffect(() => {
    if (dataProduct) setIsLoading(false);
  }, [dataProduct]);

  async function changeSaveItem() {
    const prevState = dataProduct?.is_saved_by_consumer;

    setDataProduct((prev: any) => ({
      ...prev,
      is_saved_by_consumer: null
    }));

    try {
      let is_saved_by_consumer: boolean

      if (!prevState) {
        await postSavedProductAdd(product_id);
        is_saved_by_consumer = true
      } else {
        await deleteSavedProduct(product_id);
        is_saved_by_consumer = false
      }

      setDataProduct((prev: any) => ({
        ...prev,
        is_saved_by_consumer: is_saved_by_consumer
      }));
    } catch {
      // ERRO
    }
  }

  async function handleGenerateCoupon(green_credit_amount: number) {
    setIsLoadingGenerateCoupon(true);
    try {
      await postCouponGenerate(product_id, green_credit_amount);
      setModalVisible(false);
      setCouponConfirmation(true);

      setTimeout(() => setCouponConfirmation(false), 2000);
    } catch {
      handleMessageError("Erro ao gerar cupom");
    }
    setIsLoadingGenerateCoupon(false);
  }

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );

  if (!dataProduct)
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Ocorreu um erro ao carregar o produto.</p>
      </div>
    );

  return (
    <div className="relative w-full min-h-screen bg-gray-100 p-4 flex justify-center">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow p-6 space-y-6">

        {/* Botão de voltar */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-green-700 p-2 rounded-full text-white"
        >
          <ArrowUDownLeftIcon size={24} />
        </button>

        {/* Header */}
        <div className="flex flex-col md:flex-row gap-6">

          {/* Imagem */}
          <div className="w-72 h-72 bg-gray-200 overflow-hidden rounded-lg">
            <img
              src={dataProduct.image || "/placeholder.png"}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Informações */}
          <div className="flex-1 space-y-2">
            <h1 className="text-xl font-bold">{dataProduct.name}</h1>
            <p className="text-lg font-semibold text-green-700">
              R$ {(dataProduct.price_cents / 100).toFixed(2).replace(".", ",")}
            </p>
            <p className="text-gray-600">{dataProduct.company}</p>

            {/* Botões somente se logado */}
            {!isVisitor && (
              <div className="flex gap-4 mt-3">

                {/* Gerar cupom */}
                <button
                  disabled={couponConfirmation}
                  onClick={() => setModalVisible(true)}
                >
                  {couponConfirmation ? (
                    <CheckIcon size={32} className="text-green-600" />
                  ) : (
                    <TicketIcon size={32} className="text-green-600" />
                  )}
                </button>

                {/* Salvar item */}
                <button disabled={dataProduct.is_saved_by_consumer === null} onClick={changeSaveItem}>
                  {dataProduct.is_saved_by_consumer === null ? (
                    <Loader size={32} />
                  ) : (
                    <BookmarkSimpleIcon
                      size={32}
                      className="text-green-600"
                      weight={dataProduct.is_saved_by_consumer ? "fill" : "regular"}
                    />
                  )}
                </button>

              </div>
            )}

            <p className="mt-4">
              <strong>Descrição:</strong> {dataProduct.description}
            </p>

            <p>
              <strong>Categoria:</strong> {dataProduct.category}
            </p>

            <p>
              <strong>Quantidade disponível:</strong> {dataProduct.quantity}
            </p>

            <p>
              <strong>Contato:</strong> {dataProduct.purchase_contact}
            </p>

            <p>
              <strong>Publicado:</strong>{" "}
              {new Date(dataProduct.created_at).toLocaleDateString("pt-BR")}
            </p>
          </div>
        </div>

        {/* Produtos relacionados */}
        <div className="p-4 bg-green-700 rounded-lg text-white">
          <h2 className="font-semibold mb-4">Itens Relacionados</h2>

          <div className="flex overflow-x-auto gap-4 pb-4">
            {relatedProducts.map((item) => (
              <button
                onClick={() => navigate(`/product/${item.id}`)}
                key={item.id}
                className="w-36 bg-white rounded-md overflow-hidden"
              >
                <div className="h-24 bg-gray-200">
                  <img
                    src={item.image || "/placeholder.png"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2 text-black">
                  <p className="font-semibold text-sm">{item.name}</p>
                  <p className="text-xs text-gray-600 line-clamp-2">{item.description}</p>
                  <p className="font-bold mt-1">
                    R$ {(item.price_cents / 100).toFixed(2).replace(".", ",")}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Modal */}
        {dataProduct && userData && (
          <CustomModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            userCredits={userData.green_credit_balance}
            price_cents={dataProduct.price_cents}
            handleGenerateCoupon={handleGenerateCoupon}
            isLoadingGenerateCoupon={isLoadingGenerateCoupon}
          />
        )}
      </div>
    </div>
  );
}
