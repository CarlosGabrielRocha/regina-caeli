import validator from "validator";

interface BrasilApiCepResponse {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  service: string;
}

export async function cepValidator(cep: string) {
  const isCepValid = validator.isPostalCode(cep, "BR");

  if (!isCepValid) return false

  return true
}

export async function searchCepInfo(cep: string) {
  try {
    const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`);
    if (!response.ok) return { valid: false, message: "Não foi possível encontrar as informações do CEP"};
    const data: BrasilApiCepResponse = await response.json();
    return { valid: true, data };
  } catch (error) {
    return { valid: false, message: "Não foi possível encontrar as informações do CEP"};
  }
}
