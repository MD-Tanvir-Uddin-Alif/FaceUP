import React from 'react'

const PostCreate = () => {
  return (
    <div class="flex flex-col w-full max-w-[512px] md:max-w-[960px] py-5 mx-auto">
  <div class="flex justify-between items-center p-4">
    <p class="text-[#1c1c0d] text-2xl md:text-3xl font-bold leading-tight">
      Create Post
    </p>
  </div>

  <div class="flex flex-col w-full max-w-[480px] gap-4 px-4 py-3">
    <label class="w-full">
      <textarea
        placeholder="What's on your mind?"
        class="w-full min-h-36 resize-none rounded-xl border border-[#e9e8ce] bg-[#fcfcf8] p-4 text-base text-[#1c1c0d] placeholder:text-[#9e9d47] focus:border-[#d1d0a3] focus:outline-none"
      ></textarea>
    </label>
  </div>

  <div class="flex flex-col p-4">
    <div
      class="flex flex-col items-center gap-6 rounded-xl border-2 border-dashed border-[#e9e8ce] px-6 py-14"
    >
      <div class="flex flex-col items-center gap-2 text-center">
        <p class="text-lg font-bold text-[#1c1c0d]">Upload</p>
        <p class="text-sm text-[#1c1c0d]">Drag and drop or click to upload</p>
      </div>
      <button
        class="h-10 px-4 rounded-full bg-[#f4f4e6] text-sm font-bold text-[#1c1c0d] hover:bg-[#e9e8ce] transition"
      >
        Upload
      </button>
    </div>
  </div>

  <div class="flex justify-end px-4 py-3">
    <button
      class="h-10 px-6 rounded-full bg-[#f9f506] text-sm font-bold text-[#1c1c0d] hover:bg-[#e1df06] transition"
    >
      Post
    </button>
  </div>
</div>

  )
}

export default PostCreate