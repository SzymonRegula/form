import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeValue } from '../redux/formSlice';

function DragDropFiles() {
  const dispatch = useDispatch();
  const filesState = useSelector((state) => state.form.files);

  const inputRef = useRef();

  function dragOverHandler(event) {
    event.preventDefault();
  }

  function dropHandler(event) {
    event.preventDefault();

    const newFiles = [...event.dataTransfer.files].map((file) => file.name);
    dispatch(changeValue(['files', [...new Set(filesState.concat(newFiles))]]));
  }

  function changeFilesHandler(event) {
    const newFiles = [...event.target.files].map((file) => file.name);
    dispatch(changeValue(['files', [...new Set(filesState.concat(newFiles))]]));
  }

  function removeFileHandler(fileName) {
    dispatch(
      changeValue(['files', filesState.filter((name) => name !== fileName)])
    );
  }

  return (
    <div className='dropzone' onDragOver={dragOverHandler} onDrop={dropHandler}>
      {filesState.length === 0 ? (
        <svg
          className='upload-svg'
          xmlns='http://www.w3.org/2000/svg'
          fillRule='evenodd'
          clipRule='evenodd'
          viewBox='0 0 24 24'
        >
          <path d='M11.492 10.172l-2.5 3.064-.737-.677 3.737-4.559 3.753 4.585-.753.665-2.5-3.076v7.826h-1v-7.828zm7.008 9.828h-13c-2.481 0-4.5-2.018-4.5-4.5 0-2.178 1.555-4.038 3.698-4.424l.779-.14.043-.789c.185-3.448 3.031-6.147 6.48-6.147 3.449 0 6.295 2.699 6.478 6.147l.044.789.78.14c2.142.386 3.698 2.246 3.698 4.424 0 2.482-2.019 4.5-4.5 4.5m.978-9.908c-.212-3.951-3.472-7.092-7.478-7.092s-7.267 3.141-7.479 7.092c-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.522-5.408' />
        </svg>
      ) : (
        <ul className='files-list'>
          {filesState.map((name, index) => (
            <li key={index} className='files-row'>
              <svg
                onClick={removeFileHandler.bind(null, name)}
                className='remove-svg'
                clipRule='evenodd'
                fillRule='evenodd'
                strokeLinejoin='round'
                strokeMiterlimit='2'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z' />
              </svg>
              <span name='file-name' className='file-name'>
                {name}
              </span>
            </li>
          ))}
        </ul>
      )}
      <input
        type='file'
        id='files'
        multiple
        accept='.jpg, .png, .doc, .docx, .pdf'
        onChange={changeFilesHandler}
        hidden
        ref={inputRef}
      />
      <div>
        <button
          className='select-files-btn'
          type='button'
          onClick={() => inputRef.current.click()}
        >
          Wybierz pliki
        </button>
        <p className='file-types'>jpg, png, doc, docx, pdf</p>
      </div>
    </div>
  );
}

export default DragDropFiles;
