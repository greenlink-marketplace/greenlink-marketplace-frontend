import { useState, useContext } from "react";
import { AuthContext } from "@contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import logoExtend from "@assets/images/LogoVersaoExetendida.png";
import postConsumerRegister from "@services/marketplace/postConsumerRegister";

function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext)!;

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    cpf: "",
    phone: "",
    address: "",
    password: "",
  });

  const [confirmPass, setConfirmPass] = useState<string>("")

  const [keepConnected, setKeepConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (form.password != confirmPass) {
        setErrorMsg("Senha incompatível");
        return
    }
    
    setLoading(true);
    setErrorMsg("");

    try {
      await postConsumerRegister(form);

      const success = await login(
        form.email,
        form.password,
        keepConnected
      );

      if (success) {
        navigate("/");
        return;
      }

      setErrorMsg("Cadastro realizado, mas falha ao autenticar.");
    } catch (error: any) {
      if (error?.response?.data?.detail) {
        setErrorMsg(error.response.data.detail);
      } else {
        setErrorMsg("Erro ao realizar cadastro. Verifique os dados.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="flex flex-col items-center space-y-6 p-10">
        <img
          src={logoExtend}
          alt="GreenLink Logo"
          className="h-16"
        />

        <div className="bg-white shadow-md rounded-lg p-8 w-96">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center">
            Criar Conta
          </h2>

          {errorMsg && (
            <p className="text-red-600 text-sm mb-3 text-center">
              {errorMsg}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex gap-2">
              <input
                name="first_name"
                placeholder="Nome"
                onChange={handleChange}
                required
                className="w-1/2 p-2 border rounded-md bg-gray-100"
              />
              <input
                name="last_name"
                placeholder="Sobrenome"
                onChange={handleChange}
                required
                className="w-1/2 p-2 border rounded-md bg-gray-100"
              />
            </div>

            <input
              name="username"
              placeholder="Usuário"
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md bg-gray-100"
            />

            <input
              type="email"
              name="email"
              placeholder="E-mail"
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md bg-gray-100"
            />

            <input
              name="cpf"
              placeholder="CPF"
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md bg-gray-100"
            />

            <input
              name="phone"
              placeholder="Telefone"
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md bg-gray-100"
            />

            <input
              name="address"
              placeholder="Endereço"
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md bg-gray-100"
            />

            <input
              type="password"
              name="password"
              placeholder="Senha"
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md bg-gray-100"
            />

            <input
              type="password"
              name="password"
              placeholder="Confirme a Senha"
              onChange={(e) => setConfirmPass(e.target.value)}
              required
              className="w-full p-2 border rounded-md bg-gray-100"
            />

            {/* Checkbox */}
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={keepConnected}
                onChange={(e) => setKeepConnected(e.target.checked)}
                className="h-4 w-4 text-green-600"
              />
              Manter-me conectado
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 text-white font-semibold py-2 rounded-md hover:bg-green-800 transition-colors disabled:opacity-50"
            >
              {loading ? "Criando conta..." : "Cadastrar"}
            </button>
          </form>

          <p className="text-gray-800 mt-2 text-center text-sm">
            Já possui conta?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-green-700 cursor-pointer hover:underline"
            >
              Entrar
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;