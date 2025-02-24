import PaginationUsers from "@/components/pagination/pagination/PaginationUsers";
import {loadAuthUsers} from "@/api-services/user.api";
import '../users-css/users.css';
import {SearchParams} from "next/dist/server/request/search-params";
import Link from "next/link";


const UsersPage = async ({searchParams}: { searchParams: Promise<SearchParams> }) => {
        const params = await searchParams;
        const page = params.page || '1';
        const users = await loadAuthUsers(`${page}`);

        return (
            <div>
                <h1 className='users-list-name'>The page of all users.</h1>
                <h3>Clicking on the desired user will take you to the page with detailed information about the user.</h3>
                <div className='users-list'>
                    {users.map(user =>
                        <Link href={{pathname: '/auth/users/' + user.id.toString(), query: {data: JSON.stringify(user)}}}
                              className='user-list-link' key={user.id}>
                            <div key={user.id}> {user.firstName} {user.lastName}</div>
                            <div>{user.email}</div>
                        </Link>)
                    }
                    <PaginationUsers/>
                </div>
            </div>
        );
    }
;

export default UsersPage;