import axios from 'axios';
import { redirect, RedirectType } from 'next/navigation';
const BussinessesPage = async () => {
  const response = await axios.get<{id:string}>("http://localhost:3000/api/store");
  if(response.status === 200 && response.data && response.data.id){
     return redirect (`/bussinesses/${response.data.id}/menu`,RedirectType.push)
  }
}

export default BussinessesPage