import { Radio, Space } from "antd"
import { Text } from "../../../atoms/Text/Text"
import { Title } from "../../../atoms/Title/Title"

export const FirstStep = () => {
  return (
    <>
      <Title level={4}>Pilih jenis dokumen</Title>
      <Radio.Group>
        <Space direction="vertical" size="large">
          <Radio value={1}>
            <Title level={3}>PROFIL INDIKATOR MUTU</Title>
            <Text>
              Dokumen yang digunakan sebagai pedoman penentuan dasar tolak ukur yang akan dijadikan Indikator mutu.
              Profil indikator mutu berkaitan dengan elemen input, proses, maupun output.
              Profil indikator mutu bersifat tahunan dan dapat ditutup atau dinonaktifkan setelah adanya kebijakan baru dari pemegang tanggung jawab mutu
            </Text>
          </Radio>
          <Radio value={2}>
            <Title level={3}>INDIKATOR MUTU</Title>
            <Text>
              Dokumen pelayanan kesehatan yang mengacu pada profil indikator yang terkontrol berkala 
              Indikator mutu berisi mengenai data capaian suatu indikator dengan variabel yang telah diatur didalamnya
              Analisa dari indikator mutu secara valid dapat dijadikan dasar pengambilan keputusan oleh manajemen Mutu Puskesmas
            </Text>
          </Radio>
        </Space>
      </Radio.Group>
    </>
  )
}
