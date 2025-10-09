
import bcrypt from 'bcrypt'

export class PasswordUtils {
    static readonly SALT = 12

    static hashPassword(password: string): Promise<string>{
        return bcrypt.hash(password, this.SALT);
    }

    static comparePassword(password: string, hash: string): Promise<boolean>{
        return bcrypt.compare(password, hash);
    }
}