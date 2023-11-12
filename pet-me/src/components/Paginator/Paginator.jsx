import { useContext } from "react";
import PageContext from '../../Context/PageContext';
import {Alert} from 'react-bootstrap'

export default function Paginator(props) {
  const {page,setPage} = useContext(PageContext)
  const {maxpages} = props
  
  const changePage = (p) => {
    if (p <= maxpages) {
      setPage(parseInt(p))
    } else {
      document.getElementById("last-page-alert").hidden = false;
      setTimeout(()=>{document.getElementById("last-page-alert").hidden = true;},3000)
    }
  }
  return (<>
    <Alert id="last-page-alert" variant="info" hidden={true}> 
                You've reached the last page!
    </Alert>
    <nav aria-label="Page navigation example" style={{paddingBottom:"10px"}}>
      <ul className="pagination justify-content-center">
        <li className={`page-item ${page===1?'disabled':""}`}>
          <p className="page-link text-dark" onClick={()=>changePage(page-1)} tabIndex="-1" aria-disabled={page===1?"true":"false"}>Previous</p>
        </li>
        <li className='page-item'><p className={`page-link ${page===1?'bg-warning text-light':"text-dark"}`} onClick={(e)=>changePage(e.target.innerText)}>{page<=2?1:page-2}</p></li>
        <li className='page-item'><p className={`page-link ${page===2?'bg-warning text-light':"text-dark"}`} onClick={(e)=>changePage(e.target.innerText)}>{page<=2?2:page-1}</p></li>
        <li className='page-item'><p className={`page-link ${page>=3?'bg-warning text-light':"text-dark"}`} onClick={(e)=>changePage(e.target.innerText)}>{page>3?page:3}</p></li>
        <li className='page-item'><p className={`page-link text-dark`} onClick={(e)=>changePage(e.target.innerText)}>{page>3?page+1:4}</p></li>
        <li className='page-item'><p className={`page-link text-dark`} onClick={(e)=>changePage(e.target.innerText)}>{page>3?page+2:5}</p></li>
        <li className={`page-item ${page===maxpages?'disabled':""}`}>
          <p className="page-link text-dark" onClick={()=>changePage(page+1)} tabIndex="-1" aria-disabled={page===maxpages?"true":"false"}>Next</p>
        </li>
      </ul>
    </nav>
    </>);
}