import React from 'react'

const PublicPost = () => {
  return (
    <div className="relative flex size-full min-h-screen flex-col overflow-x-hidden bg-[#fcfcf8]">
      <div className="layout-container flex h-full grow flex-col items-center py-10">
        <div className="w-full max-w-[640px] overflow-hidden rounded-lg">
          <div
            className="aspect-video w-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDYEtKY52h0bTSUsQMyuedGI4JzDgsJI0llLdF4qICvLGfFk0zkc_RncfaTt1mJeLrtMq8x8FLu6k2LLq42LIy2wI4cpKTOBSm23VJZlmvsf6WoJBuTGqKTo4u1z5bfr34gN-FH0VYGARlJxBS_pEzsPx5ov17BDHsoqh68PQfxZI3jNqmUBt2VmalhI2nRObQMZNj1kGeao5ephBpLHYtycIOpY6h5ZoaY26g4RJxOYHjMo0JLd_7Ziiju5yP-rj-VCmvNWgH_qV-0')",
            }}
          ></div>

          <div className="flex flex-col gap-2 p-5">
            <p className="text-sm font-medium text-[#9e9d47]">By Sophia Bennett</p>
            <p className="text-base leading-relaxed text-[#1c1c0d]">
              A beautiful sunset over the mountains. The sky was painted with hues of orange and purple, reflecting on the calm lake below.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PublicPost
