import jwt from 'jsonwebtoken';
import { environment } from 'src/environments/environment';



export class ValidateJWT {
    public static validate(token: string){

        return new Promise((resolve, reject) => {
            jwt.verify(token, environment.SEED, (err, decoded) => {
                if (err) {
                    reject("Token no integro");
                } else {
                    resolve(decoded.user);
                }
            })
        });
    }
}
