import React from "react";
import style from "../Loading/Loading.module.css";
import load from "../img/loading.jpg";

const Loading = () => {
    return(
        <div className={style.divContainer}>
            <div className={style.load}>
                <img className={style.img} src={load} alt="loading" width="800px" height="800px"/>
            </div>
        </div>
    )
}

export default Loading;