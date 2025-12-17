import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function IndexPage() {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate("/explorer/");
  }, [navigate])

  return null;
}

export default IndexPage;