import { randomBytes } from 'crypto';
const generarSessionId = () => {
    return randomBytes(3).toString('hex');
  };
  
export default generarSessionId;