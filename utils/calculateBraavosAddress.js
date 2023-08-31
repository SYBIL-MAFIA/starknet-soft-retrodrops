import {CallData, ec, hash, num} from "starknet";
const braavosProxyClassHash = '0x03131fa018d520a037686ce3efddeab8f28895662f019ca3ca18a626650f7d1e';
const braavosInitialClassHash = '0x5aa23d5bb71ddaa783da7ea79d405315bafa7cf0387a74f4593578c3e9e6570';

export const getBraavosAddress = async (privateKey) => {
    const calculateInitializer = (publicKey) => {
        return CallData.compile({ public_key: publicKey });
    }

    const buildProxyConstructorCallData = (initializer) => {
        return CallData.compile({
            implementation_address: braavosInitialClassHash,
            initializer_selector: hash.getSelectorFromName('initializer'),
            calldata: [...initializer]
        });
    }

    const publicKey = ec.starkCurve.getStarkKey(num.toHex(privateKey));
    const initializer = calculateInitializer(publicKey);
    const proxyConstructorCallData = buildProxyConstructorCallData(initializer);

    return hash.calculateContractAddressFromHash(
        publicKey,
        braavosProxyClassHash,
        proxyConstructorCallData,
        0
    );
};

