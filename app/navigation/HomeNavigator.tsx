import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Screen_Name } from './ScreenName';
import HomeScreen from '../screens/MainStack';
import MenuScreen from '../screens/MainStack/Menu';
import TransactionScreen from '../screens/MainStack/Transaction';
import ReportScreen from '../screens/MainStack/Report';
import SettingScreen from '../screens/MainStack/Setting';
import CoCauToChucScreen from '../screens/MainStack/Menu/Menu_Item/CoCauToChuc';
import NhanVienScreen from '../screens/MainStack/Menu/Menu_Item/NhanVien';
import PhanQuyenScreen from '../screens/MainStack/Menu/Menu_Item/PhanQuyen';
import NhomVatTuScreen from '../screens/MainStack/Menu/Menu_Item/NhomVatTu';
import NhomDonViTinhScreen from '../screens/MainStack/Menu/Menu_Item/NhomDonViTinh';
import DonViTinhScreen from '../screens/MainStack/Menu/Menu_Item/DonViTinh';
import KhoScreen from '../screens/MainStack/Menu/Menu_Item/Kho';
import VatTuScreen from '../screens/MainStack/Menu/Menu_Item/VatTu';
import LenhSanXuatScreen from '../screens/MainStack/Menu/Menu_Item/LenhSanXuat';
import UserScreen from '../screens/MainStack/Menu/Menu_Item/User';
import XuatKhoSanXuatScreen from '../screens/MainStack/Transaction/Transaction_Item/XuatKhoSanXuat';
import NhapLaiNVLThuaScreen from '../screens/MainStack/Transaction/Transaction_Item/NhapLaiNVLThua';
import NhapThanhPhamScreen from '../screens/MainStack/Transaction/Transaction_Item/NhapThanhPham';
import XuatKhacScreen from '../screens/MainStack/Transaction/Transaction_Item/XuatKhac';
import NhapKhacScreen from '../screens/MainStack/Transaction/Transaction_Item/NhapKhac';
import ChuyenKhoNoiBoScreen from '../screens/MainStack/Transaction/Transaction_Item/ChuyenKhoNoiBo';
import KiemKeScreen from '../screens/MainStack/Transaction/Transaction_Item/KiemKe';
import NhapKhoHangMuaScreen from '../screens/MainStack/Transaction/Transaction_Item/NhapKhoHangMua';
import XuatKhoTraHangScreen from '../screens/MainStack/Transaction/Transaction_Item/XuatKhoTraHang';
import XuatKhoBanHangScreen from '../screens/MainStack/Transaction/Transaction_Item/XuatKhoBanHang';
import NhapKhoHangTraLaiScreen from '../screens/MainStack/Transaction/Transaction_Item/NhapKhoHangTraLai';
import DetailReport_Screen from '../screens/MainStack/Report/Report_Item/Detail';
import DetailReportScreen from '../screens/MainStack/Report/Report_Item/Detail';
import GeneralReportScreen from '../screens/MainStack/Report/Report_Item/General';
import UserInfo_Screen from '../screens/MainStack/User';

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
      initialRouteName={Screen_Name.Home_Screen}
    >
      <Stack.Screen name={Screen_Name.Home_Screen} component={HomeScreen} />
      <Stack.Screen name={Screen_Name.Menu_Screen} component={MenuScreen} />
      <Stack.Screen
        name={Screen_Name.Transaction_Screen}
        component={TransactionScreen}
      />
      <Stack.Screen name={Screen_Name.Report_Screen} component={ReportScreen} />
      <Stack.Screen
        name={Screen_Name.Setting_Screen}
        component={SettingScreen}
      />
      <Stack.Screen
        name={Screen_Name.UserInfo_Screen}
        component={UserInfo_Screen}
      />
      {/* Menu */}
      <Stack.Screen
        name={Screen_Name.CoCauToChuc_Screen}
        component={CoCauToChucScreen}
      />
      <Stack.Screen name={Screen_Name.User_Screen} component={UserScreen} />
      <Stack.Screen
        name={Screen_Name.NhanVien_Screen}
        component={NhanVienScreen}
      />
      <Stack.Screen
        name={Screen_Name.PhanQuyen_Screen}
        component={PhanQuyenScreen}
      />
      <Stack.Screen
        name={Screen_Name.NhomVatTu_Screen}
        component={NhomVatTuScreen}
      />
      <Stack.Screen
        name={Screen_Name.NhomDonViTinh_Screen}
        component={NhomDonViTinhScreen}
      />
      <Stack.Screen
        name={Screen_Name.DonViTinh_Screen}
        component={DonViTinhScreen}
      />
      <Stack.Screen name={Screen_Name.Kho_Screen} component={KhoScreen} />
      <Stack.Screen name={Screen_Name.VatTu_Screen} component={VatTuScreen} />
      <Stack.Screen
        name={Screen_Name.LenhSanXuat_Screen}
        component={LenhSanXuatScreen}
      />
      {/* Transaction  */}
      <Stack.Screen
        name={Screen_Name.XuatKhoSanXuat_Screen}
        component={XuatKhoSanXuatScreen}
      />
      <Stack.Screen
        name={Screen_Name.NhapLaiNVLThua_Screen}
        component={NhapLaiNVLThuaScreen}
      />
      <Stack.Screen
        name={Screen_Name.NhapThanhPham_Screen}
        component={NhapThanhPhamScreen}
      />
      <Stack.Screen
        name={Screen_Name.XuatKhac_Screen}
        component={XuatKhacScreen}
      />
      <Stack.Screen
        name={Screen_Name.NhapKhac_Screen}
        component={NhapKhacScreen}
      />
      <Stack.Screen
        name={Screen_Name.ChuyenKhoNoiBo_Screen}
        component={ChuyenKhoNoiBoScreen}
      />
      <Stack.Screen name={Screen_Name.KiemKe_Screen} component={KiemKeScreen} />
      <Stack.Screen
        name={Screen_Name.NhapKhoHangMua_Screen}
        component={NhapKhoHangMuaScreen}
      />
      <Stack.Screen
        name={Screen_Name.XuatKhoTraHang_Screen}
        component={XuatKhoTraHangScreen}
      />
      <Stack.Screen
        name={Screen_Name.XuatKhoBanHang_Screen}
        component={XuatKhoBanHangScreen}
      />
      <Stack.Screen
        name={Screen_Name.NhapKhoHangTraLai_Screen}
        component={NhapKhoHangTraLaiScreen}
      />
      {/* Report */}
      <Stack.Screen
        name={Screen_Name.DetailReport_Screen}
        component={DetailReportScreen}
      />
      <Stack.Screen
        name={Screen_Name.GeneralReport_Screen}
        component={GeneralReportScreen}
      />
    </Stack.Navigator>
  );
};
export default HomeNavigator;
