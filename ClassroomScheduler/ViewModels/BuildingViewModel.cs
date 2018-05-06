﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ClassroomScheduler.ViewModels
{
    public class BuildingViewModel
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
    }
}
