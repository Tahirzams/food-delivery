import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import noimage from '../assets/img/NotFound.svg';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebaseConfig/Config'
import { setDataInFirebase } from '../utils/FirebaseFuctions';
import { SelectOptions } from '../utils/SelectOptions';
import { useStateValue } from '../context/StateProvider';

const AddItems = ({fetchdata}) => {


  let initialData = {
    isloading: false,
    name: "",
    category: "",
    price: "",
    image: "",

  }
  let [formitem, setformitem] = useState(initialData)



  let uploadimage = async (e) => {
    setformitem({ ...formitem, isloading: true })


    let img = await e.target.files[0];
    const storage = getStorage(app);
    const storageRef = ref(storage, `${Date.now()}-${img.name}`);

    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (error) => {
        console.log(error + "error while uploading");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setformitem({ ...formitem, image: downloadURL, isloading: false })
        });
      }
    );
  }
  const addData = () => {
    let { name, category, image, price } = formitem;
    console.log(name , category , price , image);
    if (!name || !category || !image || !price) {
      alert('please fill all inputs')
    } else {
      let data = {
        id: `${Date.now()}`,
        name: name,
        category: category,
        image: image,
        price: price,
        qty : 1,
      }
      setDataInFirebase(data)
      setformitem({...formitem, name: "", category:'', image:'' , price:"", isloading:false} )
    }
    fetchdata()
  }


  return (
    <div className='flex justify-center items-center'>
      <div className='w-[80vw] md:w-[70vw] lg:w-[50vw]  flex flex-col justify-center items-center mt-10 border border-gray-400 p-5 rounded-lg'>
        <div className='px-2 py-1  w-full border border-gray-400 border-[3px] rounded-md  m-1 '>
          <input type="text" placeholder='Give me a Name' value={formitem.name} onChange={(e) => setformitem({
            ...formitem
            , name: e.target.value
          })} className='w-full outline-none border-none text-xl font-medium ' />
        </div>

        {!formitem.image ? (
          <div className='px-2 py-1  w-full h-80 border border-gray-400 border-[3px] rounded-md  mt-3 flex justify-center items-center flex-col '>
            {formitem.isloading ? <Loading /> :
              <div>

                <label htmlFor="image" className='text-9xl cursor-pointer'><AiOutlineCloudUpload /></label>
                <input type="file" id='image' placeholder='Give me a Name' onChange={uploadimage} className='w-full outline-none border-none text-xl font-medium hidden ' />
              </div>}
          </div>
        ) :
          <div className='px-2 py-1  w-full h-[380px] border border-gray-400 border-[3px] rounded-md  mt-3 flex justify-center items-center flex-col '>
            <img src={formitem.image} alt="img" className=' img w-1/2 max-w-[280px] rounded-lg ' />
          </div>
        }
        <div className='px-2 py-1  w-full border border-gray-400 border-[3px] rounded-md  mt-3 '>
          <select onChange={(e) => {
            setformitem({
              ...formitem
              , category: e.target.value
            })
            console.log(e.target.value);
          }
          } name="" id="" className='w-full border-none outline-none'>
            <option value="other" className='bg-stone-600'>Categories</option>
            {SelectOptions.map((item , ind) => {
              return (
                <option key={ind} value={item.value}>{item.name}</option>
              )
            })}
          </select>
        </div>
        <div className='px-2 py-1  w-full border border-gray-400 border-[3px] rounded-md  mt-3 '>
          <input type="number" placeholder='Price' value={formitem.price} onChange={(e) => setformitem({
            ...formitem
            , price: e.target.value
          })} className='w-full outline-none border-none text-xl font-medium ' />
        </div>
        <div className='flex justify-center w-full mt-3'>
          <button className='bg-orange-400 w-1/2 py-3 text-orange-900 font-semibold text-xl' onClick={addData}>Add</button>
        </div>

      </div>



    </div>
  )
}

export default AddItems