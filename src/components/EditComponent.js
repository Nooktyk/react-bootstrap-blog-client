import { useState,useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2"
import { useLocation } from "react-router-dom"
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getToken } from "../service/authorize";

const EditComponent =()=>{

    const location = useLocation()
    const props = location.state.blog

    // สร้าง state รูปแบบ object (เก็บได้มากกว่า 1 ค่า)
    const [state,setState] = useState({
        title:"",
        author:"",
        slug:""
    })

    // destructuring ค่าใน state เพื่อให้ง่ายต่อการเอาไปผูกกับ ui, input (value) แต่ละตัว
    const {title,author,slug} = state

    const [content,setContent] = useState('')

    const submitContent=(event)=>{
        setContent(event)
      }

    // ดึงข้อมูลบทความที่ต้องการแก้ไข
    useEffect(()=>{
        axios // ยิง req
        .get(`${process.env.REACT_APP_API}/blog/${props.slug}`)
        .then(response=>{
            const {title,content,author,slug} = response.data
            setState({...state,title,author,slug})
            setContent(content)
        })
        .catch(err=>alert(err))
        // eslint-disable-next-line
    },[])

    const showUpdateFrom=()=>(
        <form onSubmit={submitForm}>
                <div className="form group">
                    <label>ชื่อบทความ</label>
                    <input type="text" className="form-control" 
                      value={title}
                      onChange={inputValue("title")}/>
                </div>
                <div className="form group">
                    <label>รายละเอียดบทความ</label>
                    <ReactQuill
                        value={content}
                        onChange={submitContent}
                        theme="snow"
                        className="pb-5 mb-3"
                        style={{border:"1px solid #666"}}
                    />
                </div>
                <div className="form group">
                    <label>ผู้แต่ง</label>
                    <input type="text" className="form-control" 
                      value={author}
                      onChange={inputValue("author")}/>
                </div>
                <br/>
                <input type="submit" value="อัพเดต" className="btn btn-primary"/>
              </form>
    )

    const inputValue = name => event =>{
      setState({...state,[name]:event.target.value});
    }

    // update ข้อมูล ที่ http://localhost:5500/api/blog/slug ด้วย method put
    const submitForm =(e)=>{
      e.preventDefault();
      console.log("API URL : ",process.env.REACT_APP_API) 
      axios
      .put(`${process.env.REACT_APP_API}/blog/${slug}`,{title,content,author},
      { 
        headers:{
            authorization:`Bearer ${getToken()}`
        }
      })
      .then(response=>{
        Swal.fire('แจ้งเตือน','แก้ไขบทความเรียบร้อย','success'
        )
        const {title,content,author,slug} = response.data
        setState({...state,title,author,slug})
        setContent(content)
      })
      .catch(err=>{
            alert(err)
      })
    }

    return (
        <div className="container p-5">
            <NavbarComponent/>
            <h1>แก้ไขบทความ</h1>
            {/* {JSON.stringify(state)} */}
            {showUpdateFrom()}
        </div>
    );
}

export default EditComponent;