import {CallData, ec, hash} from "starknet";
const braavosProxyClassHash = '0x03131fa018d520a037686ce3efddeab8f28895662f019ca3ca18a626650f7d1e';
const braavosInitialClassHash = '0x5aa23d5bb71ddaa783da7ea79d405315bafa7cf0387a74f4593578c3e9e6570';

const calculateInitializer = (publicKey) => {
    return CallData.compile({ public_key: publicKey });
};

const build_proxyConstructor = (Initializer) => {
    return CallData.compile({
        implementation_address: braavosInitialClassHash,
        initializer_selector: hash.getSelectorFromName('initializer'),
        calldata: [...Initializer],
    });
};

const build_proxyConstructorCallData = (publicKey) => {
    const Initializer = calculateInitializer(publicKey);
    return build_proxyConstructor(Initializer);
};

export const calculateBraavosAddress = (key) => {
    const publicKey = ec.starkCurve.getStarkKey(key);
    const ProxyConstructorCallData = build_proxyConstructorCallData(publicKey);

    return hash.calculateContractAddressFromHash(
        publicKey,
        braavosProxyClassHash,
        ProxyConstructorCallData,
        0
    );
};

