import { useState } from 'react'


function ViewBlogs() {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")  
  const [img, setImg] = useState(null)
  const handleImgChange = (event) => {
    const selectedImg = event.target.files[0];
    setImg(selectedFile);
  };
  return (
    <>
     <form action="/" method="POST" enctype="multipart/form-data">
        <div>
          <label for="Title">Title</label>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label for="desc">Description</label>
          <textarea
            name="desc"
            value={desc}
            rows="2"
            placeholder="Description"
            onChange={(e)=>setDesc(e.target.value)}

            required
          >
          </textarea>
        </div>
        <div>
          <label for="image">Upload Image</label>
        
          <input type="file" accept="image/*" onChange={handleFileChange} />
        {file && <img src={URL.createObjectURL(file)} alt="Preview" />}
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  )
}

export default ViewBlogs
