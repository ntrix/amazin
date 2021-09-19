import { useShipInfo } from './useShipInfo';
import CheckoutSteps from '../CheckoutSteps';
import Form from 'src/layouts/Form';
import CustomInput from 'src/components/CustomInput';
import Button from 'src/components/Button';

export default function ShippingAddressScreen({ history }: RouteProps<MatchParams>) {
  const { shipInfo, setShipInfo, locateOnMap, submitShipInfo } = useShipInfo(history);

  const setFullName: FnType = (fullName: string) => setShipInfo({ ...shipInfo, fullName });
  const setAddress: FnType = (address: string) => setShipInfo({ ...shipInfo, address });
  const setCity: FnType = (city: string) => setShipInfo({ ...shipInfo, city });
  const setPostalCode: FnType = (postalCode: string) => setShipInfo({ ...shipInfo, postalCode });
  const setCountry: FnType = (country: string) => setShipInfo({ ...shipInfo, country });

  return (
    <div className="screen--light">
      <CheckoutSteps step1 step2 />
      <Form header="Shipping Address" onSubmit={submitShipInfo} btn="Continue">
        <CustomInput text="Full Name" required hook={[shipInfo.fullName, setFullName]} />
        <CustomInput text="Address" required hook={[shipInfo.address, setAddress]} />
        <CustomInput text="City" required hook={[shipInfo.city, setCity]} />
        <CustomInput text="Postal Code" required hook={[shipInfo.postalCode, setPostalCode]} />
        <CustomInput text="Country" required hook={[shipInfo.country, setCountry]} />
        <Button fill className="mt-2" onClick={locateOnMap} label="Locate On Map" />
      </Form>
    </div>
  );
}
