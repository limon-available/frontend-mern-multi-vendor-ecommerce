import React from 'react';

const ChangePassword = () => {
    return (
        <div className='p-5 bg-white rounded-xl shadow-card'>
            <h2 className='text-xl font-bold text-slate-800 font-display pb-5 border-b border-slate-100 mb-4'>Change Password </h2>

        <form className='max-w-md'>
            <div className='flex flex-col gap-1 mb-3'>
                <label htmlFor="old_password" className='text-sm font-medium text-slate-600'>Old Password</label>
            <input className='outline-none w-full px-3 py-2.5 border border-slate-200 bg-slate-50 rounded-lg text-slate-600 focus:border-[#059473] focus:ring-2 focus:ring-emerald-100 focus:bg-white transition-all' type="password" name="old_password" id="old_password"  placeholder='Old Password'/>
            </div>

            <div className='flex flex-col gap-1 mb-3'>
                <label htmlFor="new_password" className='text-sm font-medium text-slate-600'>New Password</label>
            <input className='outline-none w-full px-3 py-2.5 border border-slate-200 bg-slate-50 rounded-lg text-slate-600 focus:border-[#059473] focus:ring-2 focus:ring-emerald-100 focus:bg-white transition-all' type="password" name="new_password" id="new_password"  placeholder='New Password'/>
            </div>

            <div className='flex flex-col gap-1 mb-3'>
                <label htmlFor="confirm_password" className='text-sm font-medium text-slate-600'>Confirm Password</label>
            <input className='outline-none w-full px-3 py-2.5 border border-slate-200 bg-slate-50 rounded-lg text-slate-600 focus:border-[#059473] focus:ring-2 focus:ring-emerald-100 focus:bg-white transition-all' type="password" name="confirm_password" id="confirm_password"  placeholder='Confirm Password'/>
            </div>
            <div>
                <button className='px-8 py-2.5 bg-gradient-to-r from-[#059473] to-[#047857] shadow-lg hover:shadow-green-500/30 text-white font-semibold rounded-lg transition-all'>Update Password </button>
            </div>


        </form>

        </div>
    );
};

export default ChangePassword;