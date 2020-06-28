import { put, takeLatest, call } from "redux-saga/effects";
import {
  ProductListResponse,
  ProductResponse,
  Product,
  CampaignResponse,
  SimpleResponse,
  Error,
  ResponseMessage,
} from "provider/models";
import {
  addItemApi,
  deleteItemApi,
  importItemApi,
  addCampaignApi,
  deleteCampaignApi,
  getProductsApi,
  updateItemApi,
  getCampaignsApi,
  getPublicCampaignsApi,
  getErrorMessage,
  getSuccessMessage,
} from "provider/apis";
import {
  GET_PUBLIC_CAMPAIGN,
  GetPublicCampaignAction,
  getPublicCampaignsSuccess,
  GET_CAMPAIGN,
  GetCampaignAction,
  UPDATE_PRODUCT,
  UpdateProductAction,
  addImageSuccess,
  PickUpdateProductsAction,
  PICK_UPDATE_PRODUCT,
  GET_PRODUCTS,
  GetProductsAction,
  getProductsSuccess,
  ADD_PRODUCT,
  AddProductAction,
  DELETE_PRODUCT,
  DeleteProductAction,
  deleteProductSuccess,
  ADD_CAMPAIGN,
  AddCampaignAction,
  DELETE_CAMPAIGN,
  DeleteCampaignAction,
  IMPORT_PRODUCT,
  ImportProductAction,
  ModalType,
  showModal,
  hideModal,
  getCampaignsSuccess,
} from "provider/actions";
import { forwardTo } from "helpers";
import { appUrl } from "routing";
import { Campaign } from "provider/models/campaign";

function* addProductCall({ payload }: AddProductAction) {
  yield put(showModal(ModalType.Loading, ""));
  try {
    const data: SimpleResponse<string> = yield addItemApi(payload);
    if ((data as Error).error) {
      yield put(
        showModal(ModalType.Error, getErrorMessage((data as Error).error[0]))
      );
    } else {
      yield put(
        showModal(
          ModalType.Success,
          getSuccessMessage((data as ResponseMessage<string>).message)
        )
      );
    }
  } catch (error) {
    yield put(showModal(ModalType.Error, error));
  }
}

function* deleteProductCall({ payload }: DeleteProductAction) {
  yield put(showModal(ModalType.Loading, ""));
  try {
    yield deleteItemApi(payload);
    yield put(deleteProductSuccess(payload));
    yield put(hideModal());
  } catch (error) {
    yield put(showModal(ModalType.Error, error));
  }
}

function* getProductsCall({ payload }: GetProductsAction) {
  try {
    const data: ProductListResponse = yield getProductsApi(payload);
    const products = data.products.entities.map((item: ProductResponse) =>
      Product.fromApi(item)
    );
    yield put(getProductsSuccess(products));
  } catch (error) {
    yield put(showModal(ModalType.Error, error));
  }
}

function* importProductCall({ payload }: ImportProductAction) {
  yield put(showModal(ModalType.Loading, ""));
  try {
    yield importItemApi(payload);
    yield put(showModal(ModalType.Success, "Import Product Successfully"));
  } catch (error) {
    yield put(showModal(ModalType.Error, error));
  }
}

function* addCampaignCall({ payload }: AddCampaignAction) {
  yield put(showModal(ModalType.Loading, ""));

  try {
    const data: SimpleResponse<string> = yield addCampaignApi(payload);
    if ((data as Error).error) {
      yield put(
        showModal(ModalType.Error, getErrorMessage((data as Error).error[0]))
      );
    } else {
      yield put(
        showModal(
          ModalType.Success,
          getSuccessMessage((data as ResponseMessage<string>).message)
        )
      );
    }
  } catch (error) {
    yield put(showModal(ModalType.Error, error));
  }
}

function* deleteCampaignCall({ payload }: DeleteCampaignAction) {
  yield put(showModal(ModalType.Loading, ""));
  try {
    yield deleteCampaignApi(payload);
    yield put(showModal(ModalType.Success, "Delete Campaign Successfully"));
  } catch (error) {
    yield put(showModal(ModalType.Error, error));
  }
}

function* pickProductCall({ payload }: PickUpdateProductsAction) {
  console.log("MOVING");
  yield put(addImageSuccess(payload.images[0].largeUrl));
  yield call(forwardTo, `/admin${appUrl.createProductPage}`);
}

function* updateProductCall({ payload }: UpdateProductAction) {
  yield put(showModal(ModalType.Loading, ""));
  try {
    const data: SimpleResponse<string> = yield updateItemApi(payload);
    if ((data as Error).error) {
      yield put(
        showModal(ModalType.Error, getErrorMessage((data as Error).error[0]))
      );
    } else {
      yield put(
        showModal(
          ModalType.Success,
          getSuccessMessage((data as ResponseMessage<string>).message)
        )
      );
    }
  } catch (error) {
    yield put(showModal(ModalType.Error, error));
  }
}

function* getCampaignsCall({ payload }: GetCampaignAction) {
  try {
    const data = yield getCampaignsApi(payload);
    const campaigns = data.campaigns.entities.map(
      (item: CampaignResponse) => new Campaign(item)
    );
    yield put(getCampaignsSuccess(campaigns));
  } catch (error) {
    yield put(showModal(ModalType.Error, error));
  }
}

function* getPublicCampaignsCall({  }: GetPublicCampaignAction) {
  try {
    const data = yield getPublicCampaignsApi();
    const campaigns = data.campaigns.entities.map(
      (item: CampaignResponse) => new Campaign(item)
    );
    yield put(getPublicCampaignsSuccess(campaigns));
  } catch (error) {
    yield put(showModal(ModalType.Error, error));
  }
}

export function* importerSaga() {
  yield takeLatest(GET_CAMPAIGN, getCampaignsCall);
  yield takeLatest(ADD_PRODUCT, addProductCall);
  yield takeLatest(UPDATE_PRODUCT, updateProductCall);
  yield takeLatest(DELETE_PRODUCT, deleteProductCall);
  yield takeLatest(IMPORT_PRODUCT, importProductCall);
  yield takeLatest(ADD_CAMPAIGN, addCampaignCall);
  yield takeLatest(DELETE_CAMPAIGN, deleteCampaignCall);
  yield takeLatest(GET_PRODUCTS, getProductsCall);
  yield takeLatest(GET_PUBLIC_CAMPAIGN, getPublicCampaignsCall);

  yield takeLatest(PICK_UPDATE_PRODUCT, pickProductCall);
}
