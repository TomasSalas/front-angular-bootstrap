import jwt_decode from 'jwt-decode';
import * as CryptoJS from 'crypto-js';
import Swal from 'sweetalert2';
import { environment } from '../../environment/environment';
import { WordArray  , Decode} from './inteface';


export default function validateToken(router:any) {
  try {
    let token:string | any = localStorage.getItem('TOKEN');

    if (localStorage.getItem('TOKEN') == null) {
      Swal.fire({
        icon: 'info',
        title: 'Sesión expirada',
        text: 'Por favor vuelva a iniciar sesión',
      }).then(() => {
        localStorage.removeItem('TOKEN');
        return router.navigate(['/']);
      })
    };

    let clave:any = environment.CLAVE_CRYPTO;
    let bytes:WordArray = CryptoJS.AES.decrypt(token, clave);
    let mensajeDescifrado:string = bytes.toString(CryptoJS.enc.Utf8);
    let decoded: Decode = jwt_decode(mensajeDescifrado);

    localStorage.setItem('rol',decoded.role);
    localStorage.setItem('data' ,JSON.stringify(decoded.data));
    localStorage.setItem('token' ,mensajeDescifrado);

    
    let dateExp:string = new Date(decoded.exp * 1000).toLocaleString();
    let date:string = new Date().toLocaleString();

    if (date > dateExp) {
      Swal.fire({
        icon: 'info',
        title: 'Sesión expirada',
        text: 'Por favor vuelva a iniciar sesión',
      }).then(() => {
        localStorage.removeItem('TOKEN')
        localStorage.removeItem('data')
        return router.navigate(['/'])
      });
    }
  }catch(e){
    return e;
  }
}