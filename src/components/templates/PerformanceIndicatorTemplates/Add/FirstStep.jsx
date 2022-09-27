import { Radio, Space } from "antd"
import { Text } from "../../../atoms/Text/Text"
import { Title } from "../../../atoms/Title/Title"

export const FirstStep = ({
  onChangeForm
}) => {
  return (
    <>
      <Title level={4}>Pilih jenis dokumen</Title>
      <Radio.Group onChange={onChangeForm}>
        <Space direction="vertical" size="large">
          <Radio value={1}>
            <Title level={3}>PROFIL INDIKATOR KINERJA</Title>
            <Text>
              Dokumen yang digunakan sebagai pedoman penentuan dasar tolak ukur yang akan dijadikan Indikator kinerja.
              Profil indikator kinerja berkaitan dengan elemen input, proses, maupun output.
              Profil indikator kinerja bersifat tahunan dan dapat ditutup atau dinonaktifkan setelah adanya kebijakan baru dari pemegang tanggung jawab kinerja
            </Text>
          </Radio>
          <Radio value={2}>
            <Title level={3}>INDIKATOR KINERJA</Title>
            <Text>
              Dokumen pelayanan kesehatan yang mengacu pada profil indikator yang terkontrol berkala 
              Indikator kinerja berisi mengenai data capaian suatu indikator dengan variabel yang telah diatur didalamnya
              Analisa dari indikator kinerja secara valid dapat dijadikan dasar pengambilan keputusan oleh manajemen Mutu Puskesmas
            </Text>
          </Radio>
        </Space>
      </Radio.Group>
    </>
  )
}
