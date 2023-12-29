import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState({
    title: "",
    task: ""
  });
  const[store,setStore]=useState([]);
  const[show,setShow]=useState(true);
  const [index,setIndex]=useState(null);
  const see=JSON.parse(localStorage.getItem('myData'));

   const remove=(index)=>{
    const removeArray=[...store];
    removeArray.splice(index,1);
    setStore(removeArray);
    localStorage.setItem('myData',JSON.stringify(removeArray));

   }

   useEffect(() => {
    const fetchData =() => {
      const storedData = JSON.parse(localStorage.getItem('myData'))||[];

      if (storedData) {
       
        setStore(storedData);
      }
    };

    fetchData();
  }, []); 

  const addData = () => {
    if(data.task==" "||data.title=='')
    {
      alert("fields cant be empty")
    }
    else{
    const obj1={...data} //it directly instates the main state//
    console.log(obj1);
    const mainStore=[...store,obj1]
    setStore(mainStore);
    localStorage.setItem('myData',JSON.stringify(mainStore))
    console.log("hey data in local storage is here",see)
    setData({
      title:" ",
      task:" "
    })
    }
    
  };

  const update=()=>{
    
       console.log("Update",index);
      const copy = [...store];
      copy.map((element,i)=>{
        
        if(i===index)
        {
          element.title=data.title,
          element.task=data.task
        }
      })
  
      setStore(copy);
      localStorage.setItem('myData', JSON.stringify(copy));
  
      setData({
        title: "",
        task: ""
      });
  
      setShow(true);
      setIndex(null);
  }

  const edit=(index)=>{
    setShow(false)
    const required=see.find((element,i)=>{
       return i===index;
    })
    setData({
      title:required.title,
      task:required.task
    })
    setIndex(index);
  }

  const handleChange = (e, val) => {
    setData({
      ...data,
      [val]: e.target.value
    });
  };

  return (
    <>
    <div className='main-container'>
      <div className='parent'>
        <div className='label-1'>Enter the Title</div>
        <input
          type='text'
          className='text-1'
          placeholder='title'
          value={data.title}
          onChange={(e) => handleChange(e,'title')}
        ></input>
       
        <div className='label-2'>Enter the Task</div>
        <input
          type='text'
          className='text-2'
          placeholder='todo'
          value={data.task}
          onChange={(e) => handleChange(e,'task')}
        ></input>
        {
           show ? (
            <button onClick={addData} id="btn-1">
              Add task
            </button>
          ) : (
            <button onClick={update} id="btn-2">
              Edit task
            </button>
          )
        }
       
      </div>
      <div className='show-data'>
        
        {

         see&& see.length>0?(see.map((element,index)=>{
             
            return <div className='tabels'>
              <ul>
             <li className='list-1'>{element.title}</li>
             <li className='list-2'>{element.task}</li>
              </ul>
              <div className='btn-3'> 
              <button type="button" className='done' onClick={()=>{remove(index)}}>Task done</button>
              <button type="button" class="change" onClick={()=>{edit(index)}}>Edit Task</button>
              </div>
               </div>
       })):(<h2></h2>)
         
        }
      </div>
      </div>
    </>
  );
}

export default App;
