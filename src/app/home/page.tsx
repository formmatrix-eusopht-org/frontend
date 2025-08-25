import Nav from '../../Layouts/header/Nav';
import Sidebar from '../../Layouts/sidebar/Sidebar';
import FormContainer from '../../Layouts/transactionContainer/FormContainer';
import '../globals.css';


export default function Home() {
    return (
        <>
            <div className="flex bg-gray-100">
                <div className='min-w-12/20'>
                    <FormContainer />
                </div>
                <div className='min-w-8/20'>
                    <Sidebar />
                </div>
            </div>
        </>
    )
}