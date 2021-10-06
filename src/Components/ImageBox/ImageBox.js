import React from 'react';
import './ImageBox.css';

const ImageBox = ({imageUrl,box}) => {


    return(
        <div className = "center ma">
                <div className = "absolute ma2 shadow-5">
                        <img  
                        id = "imageId" 
                        alt = ' ' 
                        src = {imageUrl} 
                        width = '500px' 
                        height = 'auto'/>
                        <div className = 'bounding-box' style = {{top:box.topRow,right:box.rightCol,left:box.leftCol,bottom:box.bottomRow}}></div>
                </div>
        </div>
    );
}

export default ImageBox;