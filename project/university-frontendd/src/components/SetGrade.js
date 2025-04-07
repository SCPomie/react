import React, { useState, useEffect } from 'react';
import {
  getGradeByStudentModuleCohort,
  createGrade,
  updateGrade,
  getStudents,
  getAllModules,
  getCohorts
} from '../Api';
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Paper,
  Box,
  Button,
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

function SetGrade() {
  const [students, setStudents] = useState([]);
  const [modules, setModules] = useState([]);
  const [cohorts, setCohorts] = useState([]);

  const [student, setStudent] = useState('');
  const [module, setModule] = useState('');
  const [cohort, setCohort] = useState('');
  const [caMark, setCaMark] = useState('');
  const [examMark, setExamMark] = useState('');

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    getStudents().then(res => setStudents(res.data));
    getAllModules().then(res => setModules(res.data));
    getCohorts().then(res => setCohorts(res.data));

    const prefillStudent = searchParams.get('student');
    const prefillModule = searchParams.get('module');
    const prefillCohort = searchParams.get('cohort');

    if (prefillStudent) setStudent(`http://127.0.0.1:8000/api/student/${prefillStudent}/`);
    if (prefillModule) setModule(`http://127.0.0.1:8000/api/module/${prefillModule}/`);
    if (prefillCohort) setCohort(`http://127.0.0.1:8000/api/cohort/${prefillCohort}/`);
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const studentId = student.split('/').filter(Boolean).pop();
    const moduleCode = module.split('/').filter(Boolean).pop();
    const cohortId = cohort.split('/').filter(Boolean).pop();

    const gradeData = {
      student,
      module,
      cohort,
      ca_mark: parseInt(caMark),
      exam_mark: parseInt(examMark),
    };

    try {
      const res = await getGradeByStudentModuleCohort(studentId, moduleCode, cohortId);

      if (res.data.length > 0) {
        const existingGrade = res.data[0];
        await updateGrade(existingGrade.id, gradeData);
        alert('Grade updated successfully!');
        navigate(`/students/${studentId}`);
      } else {
        await createGrade(gradeData);
        alert('Grade created successfully!');
        navigate(`/students/${studentId}`);
      }
    } catch (err) {
      console.error('Error submitting grade:', err);
      alert('Failed to submit grade.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Set Grade for a Student
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          <TextField
            select
            label="Student"
            value={student}
            onChange={(e) => setStudent(e.target.value)}
            required
            fullWidth
          >
            <MenuItem value="">Select Student</MenuItem>
            {students.map(s => (
              <MenuItem key={s.student_id} value={`http://127.0.0.1:8000/api/student/${s.student_id}/`}>
                {s.first_name} {s.last_name} ({s.student_id})
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Module"
            value={module}
            onChange={(e) => setModule(e.target.value)}
            required
            fullWidth
          >
            <MenuItem value="">Select Module</MenuItem>
            {modules.map(m => (
              <MenuItem key={m.code} value={`http://127.0.0.1:8000/api/module/${m.code}/`}>
                {m.full_name} ({m.code})
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Cohort"
            value={cohort}
            onChange={(e) => setCohort(e.target.value)}
            required
            fullWidth
          >
            <MenuItem value="">Select Cohort</MenuItem>
            {cohorts.map(c => (
              <MenuItem key={c.id} value={`http://127.0.0.1:8000/api/cohort/${c.id}/`}>
                {c.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="CA Mark"
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            value={caMark}
            onChange={(e) => setCaMark(e.target.value)}
            required
            fullWidth
          />

          <TextField
            label="Exam Mark"
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            value={examMark}
            onChange={(e) => setExamMark(e.target.value)}
            required
            fullWidth
          />

          <Button variant="contained" color="primary" type="submit" fullWidth>
            Submit Grade
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default SetGrade;
