import MainContainer from '../../components/MainContainer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';

const FirstResponder = () => {
    const { currentFios, currentWireless } = useAppSelector(
        (state) => state.data
    );
    const dispatch = useAppDispatch();
    return (
        <MainContainer>
            <h3>First Responder</h3>
        </MainContainer>
    );
};

export default FirstResponder;
