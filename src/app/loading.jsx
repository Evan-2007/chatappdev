import style from './loading.module.css'
const loading = () => {
    return ( <div>
                            <h1>Loading</h1>
            <div className={style.loaderdiv}> 
                <span class={style.loader}> 
                    <span></span> 
                    <span></span> 

                </span> 
            </div>
        </div>
     );
}
 
export default loading;