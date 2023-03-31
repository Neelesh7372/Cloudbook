import React , {useContext} from 'react';
import NoteContext from '../Context/Notes/NoteContext';


const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const {deleteNote} = context;
  const {note, updateNote} = props;
    return (
    <div className='col-md-4'>
        <div className="card my-1">
        <div className="card-body">
            <div className="d-flex align-items-center">
            <h5 className="card-title pe-2 pt-2">{note.title}</h5>
            <i className="fa-solid fa-trash-can mx-1" onClick={()=>{deleteNote(note._id);props.showAlert("Deleted Successfully","success")}}></i>
            <i className="fa-solid fa-pen-to-square mx-1" onClick={()=>{updateNote(note);}}></i>
            </div>
            <p className="card-text">{note.description}</p>
            
        </div>
        </div>
    </div>
  )
}

export default NoteItem