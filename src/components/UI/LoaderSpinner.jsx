import { tailspin } from 'ldrs'

const LoaderSpinner = () => {
  tailspin.register()

  return (
<div className=" w-full h-full flex flex-col gap-y-3 justify-center items-center  ">
      <l-tailspin
        
        size="100"
        speed="0.9"
        color="black"
        stroke={7}
      />
    </div>
  )
}

export default LoaderSpinner