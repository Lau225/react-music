import React from 'react'
import './index.less'
import { useNavigate } from 'react-router-dom'
const Index = ({children,moreLink = ''}) => {
    const navigate = useNavigate()
    const jump = () => {
        console.log(moreLink)
        navigate(moreLink)
    }
    return(
        <div style={{padding: "0 10px 0 34px", height: "33px", borderBottom: "2px solid #C10D0C",display:"flex"}} className="title-container">
            <div>
                {children}
            </div>
            <a style={{marginTop: "6px", marginLeft: "auto", fontSize: '12px', color: '#666666'}} onClick={jump}>
                更多
            </a>
            <a className="more-icon"></a>
        </div>
    )
}
export default Index;
