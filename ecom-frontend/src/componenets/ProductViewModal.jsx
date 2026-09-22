import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'

function ProductViewModal({open, setOpen, product, isAvailable}) {


  const {productId, productName, image, description, quantity, price, discount, specialPrice} = product;
  const handleClickOpen = () => {
    setOpen(true);
  }

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10 foucs:outline-one">
        <DialogBackdrop className="fixed inset-0 bg-gray-500 opacity-75 tracking-normal" />
        <div className="fixed inset-0 z-10 flex w-screen overflow-y-auto items-center justify-center p-4">
            <div className = "flex min-h-full items-center justify-center p-4">
                <DialogPanel 
                    transition
                    className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all md:max-w md:min-w w-full">

                    {image && (
                        <div className="flex justify-cente">
                            <img className = "w-full h-full cursor-pointer transition-transform duration-300 transform hover:scale-105"
                                src = {image} alt = {productName}>
                            </img>
                        </div>
                    )}
                    
                    <DialogTitle className="font-bold text-slate-800">
                        {productName}
                    </DialogTitle>
            
                    <p className = "text-slate-600">
                        {description}
                    </p>
                
                    <div >
                        <button className= " bg-gray-400 px-1 py-2 inline-flex items-center rounded-lg cursor-pointer" onClick={() => setOpen(false)}>
                            Got it, Thanks..
                        </button>
                    </div>

            </DialogPanel>
            </div>
        </div>
      </Dialog>
    </>
  )
}

export default ProductViewModal;