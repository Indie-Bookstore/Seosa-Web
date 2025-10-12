export const passwordValidator = {
  minLength: (password: string) => password.length >= 8,
  hasLetter: (password: string) => /[a-zA-Z]/.test(password),
  hasNumber: (password: string) => /[0-9]/.test(password),
};
