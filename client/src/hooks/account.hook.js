import * as accountService from '../service/account.service';

const useAccount = () => {
  
    const register = async ({ username, email, password}) => {
        const result = await accountService.register(username, email, password);
        if (result.error) {
            throw new Error(result.message);
        }
        return result;
    };

    // TODO: test token expiration mistake
    const confirmRegistartion = (token) => {
        return accountService
                .confirmRegistration(token)
                .then(({ message }) => message);
    };

    const resetPassword = (email) => {
        return accountService.resetPasswordRequest(email);
    };

    const confirmResetPassword = async (token, password) => {
        const result = await accountService.resetPasswordConfirm(token, password);
        if (result.error) {
            throw new Error(result.message);
        }
        return result;
    };

    return { register, confirmRegistartion, resetPassword, confirmResetPassword };
};

export default useAccount;
