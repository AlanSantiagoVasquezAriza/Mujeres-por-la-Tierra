const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

(async () => {
  const { data, error } = await supabase
    .from('articles')
    .select('*');

  if (error) {
    console.error('❌ ERROR:', error);
  } else {
    console.log('✅ DATA:', data);
  }
})();
