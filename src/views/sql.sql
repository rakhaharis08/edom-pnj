SELECT
  u.user_id,
  u.user_name,
  COUNT(kbm.kbm_id) AS jumlah_kbm_diikuti,
  COUNT(DISTINCT a.answer_dosen) AS jumlah_dosen_dinilai
FROM
  table_user u
LEFT JOIN table_kelas k ON u.user_kelas = k.kelas_id
LEFT JOIN table_kbm kbm ON u.user_kelas = kbm.kbm_kelas
LEFT JOIN table_answer a ON kbm.kbm_dosen = a.answer_dosen AND kbm.kbm_matkul = a.answer_matkul AND kbm.kbm_semester = a.answer_semester
WHERE
  kbm.kbm_semester = 2
GROUP BY u.user_id, u.user_name;