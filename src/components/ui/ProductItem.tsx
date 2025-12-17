import { useNavigate } from "react-router-dom";

export default function ProductItem({
  id,
  name,
  description = "",
  image,
  price_cents,
}: ProductPagination) {
  const navigate = useNavigate();
  const widthImagePx = 150;

  function descriptionFormatted() {
    const maxLength = 60;
    return description.length > maxLength
      ? description.slice(0, maxLength) + "..."
      : description;
  }

  function goProductScreen() {
    navigate(`/product/${id}`);
  }

  return (
    <div
      className="grow max-w-[320px] flex justify-center"
      style={{ flexBasis: widthImagePx }}
    >
      <button
        onClick={goProductScreen}
        className="w-full text-left"
      >
        <div className="flex flex-wrap border border-gray-300 overflow-hidden">
          {/* Image */}
          <div
            className="grow bg-gray-200"
            style={{ flexBasis: widthImagePx, height: 120 }}
          >
            <img
              src={
                image && image.length
                  ? image
                  : "/images/LogoGreenLink.png"
              }
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col grow-10 basis-[100px] p-1">
            <p className="text-sm font-medium">
              {name}
            </p>

            <div className="grow overflow-hidden">
              <p className="text-[10px] text-gray-700">
                {descriptionFormatted()}
              </p>
            </div>

            <p className="text-right text-[15px] font-semibold">
              R$ {(price_cents / 100)
                .toFixed(2)
                .replace(".", ",")}
            </p>
          </div>
        </div>
      </button>
    </div>
  );
}