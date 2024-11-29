import { useNavigate, useSearchParams } from 'react-router-dom';
import './Verify.css';
import { useContext, useEffect } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");

    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        try {
            const response = await axios.post(`${url}/api/order/verify`, { success, orderId });

            if (response.data.success) {
                // Nếu xác nhận thành công, chuyển hướng về trang của người dùng
                navigate("/myorders"); // Đường dẫn đến trang đơn hàng của người dùng
            } else {
                // Nếu không thành công, có thể chuyển hướng về trang chính hoặc hiển thị thông báo lỗi
                navigate("/"); // Hoặc có thể điều hướng đến một trang thông báo cụ thể
            }
        } catch (error) {
            console.error("Error verifying payment:", error);
            navigate("/"); // Chuyển hướng về trang chính trong trường hợp lỗi
        }
    }

    useEffect(() => {
        verifyPayment();
    }, []);

    return (
        <div className='verify'>
            <div className="spinner"></div>
            <p>Verifying your payment...</p>
        </div>
    );
}

export default Verify;
