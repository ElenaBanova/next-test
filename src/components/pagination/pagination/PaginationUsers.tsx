'use client'

import '../pagiaion-css/pagination.css';
import {useRouter, useSearchParams} from "next/navigation";


const PaginationUsers = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    let page = Number(searchParams.get('page')) || 1;
    return (
        <div className='pagination'>
            <button className='button-pag' onClick={() => {
                if (page > 1) {
                    router.push('/auth/users/?page=' + (--page).toString())
                }
            }}>Previous page
            </button>
            <button className='button-pag' onClick={() => {
                router.push('/auth/users/?page=' + (++page).toString())
            }}>Next page
            </button>
        </div>
    );
};

export default PaginationUsers;