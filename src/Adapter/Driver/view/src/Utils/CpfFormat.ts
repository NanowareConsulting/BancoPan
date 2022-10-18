export function removeMask(cpf: string) {
  let cpfWithoutMask = cpf.replaceAll("-", "");
  cpfWithoutMask = cpfWithoutMask.replaceAll(".", "");

  return cpfWithoutMask;
}
