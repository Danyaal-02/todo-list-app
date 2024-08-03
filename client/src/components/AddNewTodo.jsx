import React from 'react'

const AddNewTodo = ({setIsAddModalOpen, handleAddSubmit}) => {
  return (
    <div className="modal">
      <div className="modal-box bg-gray-800 text-gray-100">
        <h3 className="font-bold text-2xl mb-4 text-purple-300">Add New Todo</h3>
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-300">Title</span>
            </label>
            <input type="text" name="title" placeholder="Title" className="input input-bordered bg-gray-700 text-gray-100" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-300">Description</span>
            </label>
            <textarea name="description" className="textarea textarea-bordered bg-gray-700 text-gray-100" placeholder="Description" required></textarea>
          </div>
          <div className="modal-action">
            <button type="submit" className="btn bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200">Add</button>
            <button type="button" className="btn bg-gray-600 hover:bg-gray-700 text-white transition-colors duration-200" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddNewTodo