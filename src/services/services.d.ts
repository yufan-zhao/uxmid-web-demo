import { AuthService as AuthServiceBase } from "./application";

declare global
{
    namespace IServices
    {
        // application
        class AuthService extends AuthServiceBase {}

        // business
    }
}
