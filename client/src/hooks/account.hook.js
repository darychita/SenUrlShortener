import * as accountService from '../service/account.service';

const useAccount = () => {
    
    const handler = (func) => async (...args) => {
        const result = await func(...args);
        if(result.error) {
            throw new Error(result.message);
        }
        return result.message ?? '';
    };
  
    const register = ({ username, email, password}) => {
        return handler(accountService.register)(username, email, password);
    };

    const confirmRegistartion = (token) => {
        return handler(accountService.confirmRegistration)(token);
    };

    const resetPassword = (email) => {
        return handler(accountService.resetPasswordRequest)(email);
    };

    const resetPasswordExists = (token) => {
        return handler(accountService.resetTokenExists)(token);
    };

    const confirmResetPassword = (token, password) => {
        return handler(accountService.resetPasswordConfirm)(token, password);
    };

    const updatePassword = (password) => {
        return handler(accountService.updatePassword)(password);
    };

    const deleteUser = async () => {
        return handler(accountService.deleteUser)();
    };

    return { 
        register, 
        confirmRegistartion,
        resetPassword,
        confirmResetPassword,
        resetPasswordExists,
        updatePassword,
        deleteUser
    };
};

export default useAccount;
