import { useNavigate, useSearchParams } from "react-router-dom"

export const useNavigateBack = () => {
  const [queryparams] = useSearchParams();
  const navigate = useNavigate();
  const backTo = queryparams.get('back_to');

  return [() => navigate(backTo), (absolutePath) => `${absolutePath}?${queryparams.toString()}`]
}

