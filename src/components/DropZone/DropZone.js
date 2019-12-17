import React ,{useCallback , Component} from "react"
import {useDropzone} from 'react-dropzone'
import "./DropZone.css";
import {connect} from "react-redux"
import * as actions from "../../store/actions/index"

const {getRootProps, getInputProps} = useDropzone({noClick: true,onDrop:onDrop});
class DropZone extends Component{

    


    onDrop = useCallback(acceptedFiles => {
        
        this.props.onUploadFiles(acceptedFiles)
      }, [])

    render(){
        return (
            <section className="container">
                <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                </div>
            </section>
        );
    }
  

}

const mapDispatchToProps=dispatch=>{
    return {
        onUploadFiles:(files)=>dispatch(actions.uploadFiles(files))
    }
}

export default connect(null,mapDispatchToProps)(DropZone);