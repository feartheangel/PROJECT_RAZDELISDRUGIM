import React, {useState} from 'react';
import './MyGlobalData.css';
import MyData from "./MyData/MyData";
import MyAddresses from "./MyAddresses/MyAddresses";



const MyGlobalData = ()=>{


const[activeForm, setActiveForm]= useState('myData');



    return(

                <div className="container_profile">

                        {/* ЛЕВЫЙ ОПЦИОНАЛ */}
                        <div className="container_profile_optional">
                            <p
                                className={ activeForm==='myData' && "container_profile_optional_myData" }
                                onClick = {()=> setActiveForm('myData')}
                            > Мои данные </p>
                            <p
                                className={ activeForm==='myAddresses' && "container_profile_optional_myAddresses" }
                                onClick = {()=> setActiveForm('myAddresses')}
                            > Мои адреса </p>
                            <p> Мои документы </p>
                            <p> Кошелёк </p>
                            <p> Уведомления </p>
                        </div>

                        {/* ПРАВАЯ ЧАСТЬ */}

                    <div className ="container_profile_content">
                        {activeForm==='myData' && <MyData />}
                        {activeForm==='myAddresses' && <MyAddresses />}





                    </div>


                </div>


    )
}

export default MyGlobalData