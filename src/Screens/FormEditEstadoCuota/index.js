import HeaderSection from "../../Components/Header/Header";
import FooterSection from "../../Components/Footer/Footer";
import Formulario from "../../Components/FormEdit/EstadoCuota/Form";

const editEstadoCuota = () => {
    return (
        <div>
            <HeaderSection />
            <Formulario />
            <FooterSection />
        </div>
    );
}

export default editEstadoCuota;