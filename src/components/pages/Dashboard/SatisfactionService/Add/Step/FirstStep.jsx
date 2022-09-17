import { Radio, Space } from "antd"
import { Text } from "../../../../../atoms/Text/Text"
import { Title } from "../../../../../atoms/Title/Title"

export const FirstStep = ({
    onChangeForm
}) => {
    return (
        <>
            <Title level={4}>PILIH JENIS DOKUMEN</Title>
            <Radio.Group onChange={onChangeForm}>
                <Space direction="vertical" size="large">
                    <Radio value={1}>
                        <Title level={3}>INPUT TINGKAT KEPUASAN LAYANAN</Title>
                        <Text>
                            Tingkat kepuasan layanan diinput berdasarkan hasil survei yang dilakukan kepada pasien yang berobat ke Puskesmas
                            Survei dilakukan menggunakan aplikasi e-Puskesmas dengan memberi pilihan kepada pasien berupa logo smiley
                            Tingkat kepuasan layanan diinput perbulan kedalam aplikasi ruang mutu oleh tim mutu.
                        </Text>
                    </Radio>
                    <Radio value={2}>
                        <Title level={3}>BUAT DOKUMEN KELUHAN PELANGGAN</Title>
                        <Text>
                            Dokumen keluhan pelanggan diinput berdasarkan keluhan yang ada
                            Keluhan pelanggan yang masuk, bisa didapatkan dari aplikasi social media, email Puskesmas, no. Hotline dll
                            Setiap petugas Puskesmas juga bisa menginput keluhan antar petugas ataupun keluhan lain dengan melampirkan
                            bukti-bukti yang otentik. Setiap keluhan yang masuk akan langsung di respon oleh pihak-pihak terkait dan atas
                            sepengetahuan kepala Puskesmas.
                        </Text>
                    </Radio>
                </Space>
            </Radio.Group>
        </>
    )
}
