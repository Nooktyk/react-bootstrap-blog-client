import { useState } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { getUser, getToken } from "../service/authorize";

const FormComponent =()=>{

    // สร้าง state รูปแบบ object (เก็บได้มากกว่า 1 ค่า)
    const [state,setState] = useState({
        title:"",
        author:getUser()
    })

    // destructuring ค่าใน state เพื่อให้ง่ายต่อการเอาไปผูกกับ ui, input (value) แต่ละตัว
    const {title,author} = state

    const [content,setContent] = useState('')

    const inputValue = name => event =>{
      setState({...state,[name]:event.target.value});
    }

    const submitContent=(event)=>{
      setContent(event)
    }

    // สร้างฟังก์ชัน submit
    const submitForm =(e)=>{
      e.preventDefault(); // ยังไม่ให้เคลียร์ฟอร์มเมื่อกด submit form
      // console.table({title,content,author}) // แสดงค่าเป็นตารางให้ดูเมื่อ submit form
      console.log("API URL : ",process.env.REACT_APP_API) // ทดสอบแสดงผล url api
      // ส่งค่าที่ต้องการบันทึกผ่าน axios ด้วยการยิง req ไปที่ api พร้อมกับส่งค่าไป
      // เมื่อบันทึกสำเร็จให้มี alert แจ้งเตือนด้วย .then
      // หากบันทึกไม่สำเร็จจะ alert แจ้งเตือน error ที่เรากำหนดไว้ในฝั่ง server controller
      axios
      .post(`${process.env.REACT_APP_API}/create`,{title,content,author},
      { 
        headers:{
            authorization:`Bearer ${getToken()}`
        }
      })
      .then(response=>{
        // alert("บันทึกข้อมูลเรียบร้อย");
        // ใช้งาน sweetaert2
        Swal.fire(
          'แจ้งเตือน',
          'บันทึกข้อมูลบทความเรียบร้อย',
          'success'
        )
        setState({...state,title:"",author:""}) // clear form
        setContent("")
      })
      .catch(err=>{
        // alert(err.response.data.error)
        Swal.fire(
          'แจ้งเตือน',
          err.response.data.error,
          'error'
        )
      })
    }

    return (
        <div className="container p-5">
            <NavbarComponent/>
            <h1>เขียนบทความ</h1>
            {/* {JSON.stringify(state)} */}
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
                        placeholder="เขียนรายละเอียดบทความของคุณ" 
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
                <input type="submit" value="บันทึก" className="btn btn-primary"/>
              </form>
          </div>
    );
}

export default FormComponent;