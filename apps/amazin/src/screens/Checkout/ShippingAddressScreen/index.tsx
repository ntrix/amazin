import { useShippingAddress } from './useShippingAddress';
import CheckoutSteps from '../CheckoutSteps';
import Form from 'src/layouts/Form';
import CustomInput from 'src/components/CustomInput';
import Button from 'src/components/Button';

export default function ShippingAddressScreen({ history }: RouteProps<MatchParams>) {
  const { createHook, locateOnMap, submitShipInfo } = useShippingAddress(history);

  return (
    <div className="screen--light">
      <CheckoutSteps step1 step2 />
      <Form header="Shipping Address" onSubmit={submitShipInfo} btn="Continue">
        <CustomInput text="Full Name" type="name" required hook={createHook('fullName')} />
        <CustomInput text="Address" required hook={createHook('address')} />
        <CustomInput text="City" required hook={createHook('city')} />
        <CustomInput text="Postal Code" type="postalCode" required hook={createHook('postalCode')} />
        <CustomInput text="Country" required hook={createHook('country')} />
        <Button fill className="mt-2" onClick={locateOnMap} label="Locate On Map" />
      </Form>
    </div>
  );
}
